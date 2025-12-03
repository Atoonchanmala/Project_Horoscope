import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Card } from './ui/card';
import { CalendarIcon, Sparkles } from 'lucide-react';
import { UserData } from '../App';

interface UserInfoFormProps {
  onSubmit: (data: UserData) => void;
  initialData: UserData;
}

export function UserInfoForm({ onSubmit, initialData }: UserInfoFormProps) {
  const [formData, setFormData] = useState<UserData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="bg-[#1B1B2F]/60 border-[#7F5AF0]/30 backdrop-blur-sm p-8 shadow-[0_0_40px_rgba(127,90,240,0.3)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-[#FFCB6B]" />
          <h2 className="text-[#F7EDEA]">Tell Us About Yourself</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#F7EDEA]">
              Phone Number <span className="text-[#7F5AF0]">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="bg-[#0D0D12] border-[#7F5AF0]/50 text-[#E0E0E0] focus:border-[#BF93F9] focus:ring-[#BF93F9]/50 transition-all duration-300"
            />
            {errors.phoneNumber && (
              <p className="text-red-400 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label className="text-[#F7EDEA]">
              Date of Birth <span className="text-[#7F5AF0]">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left bg-[#0D0D12] border-[#7F5AF0]/50 text-[#E0E0E0] hover:bg-[#1B1B2F] hover:border-[#BF93F9] transition-all duration-300"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[#7F5AF0]" />
                  {formData.dateOfBirth ? (
                    formatDate(formData.dateOfBirth)
                  ) : (
                    <span className="text-[#E0E0E0]/50">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#1B1B2F] border-[#7F5AF0]/50">
                <Calendar
                  mode="single"
                  selected={formData.dateOfBirth}
                  onSelect={(date) =>
                    setFormData({ ...formData, dateOfBirth: date })
                  }
                  initialFocus
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  className="text-[#E0E0E0]"
                />
              </PopoverContent>
            </Popover>
            {errors.dateOfBirth && (
              <p className="text-red-400 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="text-[#F7EDEA]">
              Gender <span className="text-[#7F5AF0]">*</span>
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
            >
              <SelectTrigger className="bg-[#0D0D12] border-[#7F5AF0]/50 text-[#E0E0E0] focus:border-[#BF93F9] focus:ring-[#BF93F9]/50 transition-all duration-300">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent className="bg-[#1B1B2F] border-[#7F5AF0]/50">
                <SelectItem value="male" className="text-[#E0E0E0]">
                  Male
                </SelectItem>
                <SelectItem value="female" className="text-[#E0E0E0]">
                  Female
                </SelectItem>
                <SelectItem value="other" className="text-[#E0E0E0]">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-400 text-sm">{errors.gender}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7F5AF0] to-[#BF93F9] hover:from-[#BF93F9] hover:to-[#7F5AF0] text-[#F7EDEA] shadow-[0_0_20px_rgba(127,90,240,0.5)] transition-all duration-300"
            >
              Continue to Frequency Selection
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </Card>
  );
}
