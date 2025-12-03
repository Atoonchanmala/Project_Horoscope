'use client';

import { useState, useTransition } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Card } from './ui/card';
import { CalendarIcon, Sparkles } from 'lucide-react';
import type { UserData } from '@/types/horoscope';
import la from '@/i18n/lo';

// ======== interface type =========
interface UserInfoFormProps {
  initialData: UserData;
}

export function UserInfoForm({ initialData }: UserInfoFormProps) {
  const [formData, setFormData] = useState<UserData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  console.log("forData: ", formData);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-()]+$/.test(formData.phone))
      newErrors.phone = 'Please enter a valid phone number';
    if (!formData.birthdate) newErrors.birthdate = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(formData));

    // Redirect step2  client
    startTransition(() => {
      window.location.href = "/step2";
    });

  };

  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('lo-LA', { //en-US
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="bg-[#1B1B2F]/60 border-[#7F5AF0]/30 backdrop-blur-sm p-8 shadow-[0_0_40px_rgba(127,90,240,0.3)]">

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-[#FFCB6B]" />
          <h2 className="text-[#F7EDEA] text-2xl font-semibold">
            {/* Tell Us About Yourself */}
            {la.InfoHoroscope}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/*================= Phone ====================*/}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#F7EDEA]">
              {/* Phone Number */}
              {la.phone}
              <span className="text-[#7F5AF0]">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="85620 223 556 10"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#0D0D12] border-[#7F5AF0]/50 text-[#E0E0E0] focus:border-[#BF93F9] focus:ring-[#BF93F9]/50 transition-all duration-300"
            />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
          </div>

          {/* ============= Birthdate =================*/}
          <div className="space-y-2">
            <Label className="text-[#F7EDEA]">
              {/* Date of Birth  */}
              {la.birthDate}
              <span className="text-[#7F5AF0]">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left bg-[#0D0D12] border-[#7F5AF0]/50 text-[#E0E0E0] hover:bg-[#1B1B2F] hover:border-[#BF93F9] transition-all duration-300"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[#7F5AF0]" />
                  {formData.birthdate ? formatDate(formData.birthdate) : 'ເລືອກວັນເດືອນປີເກີດຂອງເຈົ້າ'}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0 bg-[#1B1B2F] border-[#7F5AF0]/50">
                <Calendar
                  mode="single"
                  selected={formData.birthdate ? new Date(formData.birthdate) : undefined}
                  onSelect={(date) =>
                    setFormData({
                      ...formData,
                      birthdate: date ? date.toISOString().split('T')[0] : '',
                    })
                  }
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  className="text-[#E0E0E0]"
                />
              </PopoverContent>
            </Popover>
            {errors.birthdate && <p className="text-red-400 text-sm">{errors.birthdate}</p>}
          </div>

          {/*=============  Gender ================*/}
          <div className="space-y-2">
            <Label className="text-[#F7EDEA]">
              {/* Gender  */}
              {la.gender}
              <span className="text-[#7F5AF0]">*</span>
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <SelectTrigger className="bg-[#0D0D12] border-[#7F5AF0]/50 text-[#E0E0E0] focus:border-[#BF93F9] focus:ring-[#BF93F9]/50 transition-all duration-300">
                <SelectValue placeholder="ກະລຸນາເລືອກເພດຂອງເຈົ້າ" />
              </SelectTrigger>
              <SelectContent className="bg-[#1B1B2F] border-[#7F5AF0]/50">
                <SelectItem value="male" className="text-[#E0E0E0]">
                  {/* Male */}
                  {la.genderGirl}
                </SelectItem>
                <SelectItem value="female" className="text-[#E0E0E0]">
                  {/* Female */}
                  {la.genderBoy}
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-400 text-sm">{errors.gender}</p>}
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-[#7F5AF0] to-[#BF93F9] hover:from-[#BF93F9] hover:to-[#7F5AF0] text-[#F7EDEA] shadow-[0_0_20px_rgba(127,90,240,0.5)] transition-all duration-300"
            >
              {isPending ? 'ກຳລັງດຳເນີນການ...' : `${la.buttonContinue}`}
            </Button>
          </motion.div>

        </form>
      </motion.div>
    </Card>
  );
}
