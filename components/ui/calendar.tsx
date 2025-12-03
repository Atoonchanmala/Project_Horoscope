import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {

  const [month, setMonth] = React.useState(
    props.selected ? new Date(props.selected as any) : new Date()
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 121 }, (_, i) => currentYear - i);

  const months = [
    "ມັງກອນ","ກຸມພາ","ມີນາ","ເມສາ","ພຶດສະພາ","ມິຖຸນາ",
    "ກໍລະກົດ","ສິງຫາ","ກັນຍາ","ຕຸລາ","ພະຈິກ","ທັນວາ"
  ];

  return (
    <DayPicker
      month={month}
      onMonthChange={setMonth}
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-3 sm:p-4 md:p-5 space-y-4 w-full max-w-full mx-auto",
        className
      )}
      classNames={{
        /** Month container **/
        months: "flex flex-col items-center w-full",
        month: "w-full space-y-3",

        /** Header caption **/
        caption: "flex flex-col items-center gap-3 w-full",
        caption_label: "hidden",

        /** Navigation (prev/next) **/
        nav: "flex items-center justify-between w-full px-1",
        nav_button:
          "p-2 rounded-lg hover:bg-accent transition active:scale-95",

        /** Table layout **/
        table: "w-full",
        head_row: "grid grid-cols-7",
        head_cell:
          "text-muted-foreground text-[10px] sm:text-xs md:text-sm font-medium flex justify-center",

        row: "grid grid-cols-7 gap-[2px] sm:gap-1 md:gap-2",
        cell: "flex justify-center",

        /** Days **/
        day: cn(
          "flex items-center justify-center rounded-md sm:rounded-lg md:rounded-xl",
          "cursor-pointer transition select-none",

          // Responsive size
          "w-8 h-8 text-[11px]",        // mobile
          "sm:w-9 sm:h-9 sm:text-xs",   // sm mobile
          "md:w-10 md:h-10 md:text-sm", // tablet
          "lg:w-11 lg:h-11",            // desktop
        ),

        day_today:
          "border border-primary text-primary font-medium",
        day_selected:
          "bg-primary text-primary-foreground font-semibold",
        day_outside:
          "text-muted-foreground opacity-40",
        day_disabled:
          "opacity-30 cursor-not-allowed",

        ...classNames,
      }}
      components={{
        /** Nav Buttons Icons **/
        IconLeft: () => <ChevronLeft className="h-5 w-5" />,
        IconRight: () => <ChevronRight className="h-5 w-5" />,

        /** Month + Year Select **/
        Caption: ({ displayMonth }) => {
          const handleMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newMonthIndex = months.indexOf(e.target.value);
            const newDate = new Date(displayMonth);
            newDate.setMonth(newMonthIndex);
            setMonth(newDate);
          };

          const handleYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newDate = new Date(displayMonth);
            newDate.setFullYear(Number(e.target.value));
            setMonth(newDate);
          };

          return (
            <div className="flex flex-col items-center gap-2 w-full">

              {/* Responsive Select Controls */}
              <div className="
                  grid grid-cols-2 gap-2 w-full
                  sm:max-w-[320px]
                  md:max-w-[360px]
                  lg:flex lg:gap-4 lg:justify-center
                "
              >
                {/* Month Select */}
                <select
                  value={months[displayMonth.getMonth()]}
                  onChange={handleMonth}
                  className="
                    bg-[#1B1B2F] border border-[#7F5AF0]/40 text-white 
                    rounded-md px-2 sm:px-3 py-2
                    text-xs sm:text-sm md:text-base w-full
                  "
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* Year Select */}
                <select
                  value={displayMonth.getFullYear()}
                  onChange={handleYear}
                  className="
                    bg-[#1B1B2F] border border-[#7F5AF0]/40 text-white 
                    rounded-md px-2 sm:px-3 py-2
                    text-xs sm:text-sm md:text-base w-full
                  "
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        },
      }}
      {...props}
    />
  );
}
