/**
 * BookingForm Component - Molecular component for Nozah
 * Form for submitting booking requests
 */

import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { BOOKING_CONFIG, COLORS, SUCCESS_MESSAGES } from '../../shared/const';
import { bookingApi } from '@/lib/api';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  description: string;
}

interface BookingFormProps {
  onSuccess?: (data: BookingFormData) => void;
  onError?: (error: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: 'tattoo',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.service) {
      newErrors.service = 'Service is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      onError?.('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      await bookingApi.create(formData);
      setSuccessMessage(SUCCESS_MESSAGES.BOOKING_SUBMITTED);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: 'tattoo',
        description: '',
      });
      onSuccess?.(formData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to submit booking';
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate minimum date (today + MIN_DATE_OFFSET)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + BOOKING_CONFIG.MIN_DATE_OFFSET);
  const minDateString = minDate.toISOString().split('T')[0];

  // Calculate maximum date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + BOOKING_CONFIG.MAX_DATE_OFFSET);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMessage && (
        <div
          className="p-4 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: COLORS.SECONDARY, color: COLORS.BLACK }}
        >
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your@email.com"
          required
        />
      </div>

      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder="+254 7XX XXX XXX"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-semibold mb-2"
            style={{ color: COLORS.BLACK }}
          >
            Preferred Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            min={minDateString}
            max={maxDateString}
            className="w-full px-4 py-2.5 rounded-lg border-2 font-[Lato] focus:outline-none"
            style={{
              borderColor: errors.date ? COLORS.ERROR : COLORS.PRIMARY,
              backgroundColor: COLORS.WHITE,
              color: COLORS.BLACK,
            }}
            required
          />
          {errors.date && (
            <p className="text-sm mt-1" style={{ color: COLORS.ERROR }}>
              {errors.date}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-semibold mb-2"
            style={{ color: COLORS.BLACK }}
          >
            Preferred Time
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border-2 font-[Lato] focus:outline-none"
            style={{
              borderColor: errors.time ? COLORS.ERROR : COLORS.PRIMARY,
              backgroundColor: COLORS.WHITE,
              color: COLORS.BLACK,
            }}
            required
          >
            <option value="">Select a time</option>
            {BOOKING_CONFIG.TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && (
            <p className="text-sm mt-1" style={{ color: COLORS.ERROR }}>
              {errors.time}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.BLACK }}
        >
          Service Type
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border-2 font-[Lato] focus:outline-none"
          style={{
            borderColor: errors.service ? COLORS.ERROR : COLORS.PRIMARY,
            backgroundColor: COLORS.WHITE,
            color: COLORS.BLACK,
          }}
          required
        >
          <option value="tattoo">Tattoo Design</option>
          <option value="digital">Digital Art</option>
          <option value="pen">Pen Art</option>
          <option value="custom">Custom Artwork</option>
        </select>
        {errors.service && (
          <p className="text-sm mt-1" style={{ color: COLORS.ERROR }}>
            {errors.service}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold mb-2"
          style={{ color: COLORS.BLACK }}
        >
          Project Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          rows={5}
          className="w-full px-4 py-2.5 rounded-lg border-2 font-[Lato] focus:outline-none resize-none"
          style={{
            borderColor: COLORS.PRIMARY,
            backgroundColor: COLORS.WHITE,
            color: COLORS.BLACK,
          }}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Request Booking'}
      </Button>
    </form>
  );
};

export default BookingForm;

