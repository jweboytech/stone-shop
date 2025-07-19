'use client';

import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CountryList = ({ data }: { data: Country[] }) => {
  const [activeCurrencyCode, setActiveCurrencyCode] = React.useState<string>(
    'Please select country',
  );

  const handleChange = (value: string) => {
    setActiveCurrencyCode(value);
  };

  React.useEffect(() => {
    if (data != null) {
      const defaultItem = data[0];

      setActiveCurrencyCode(defaultItem.currencyCode);
    }
  }, [data]);

  return (
    <Select value={activeCurrencyCode} onValueChange={handleChange}>
      <SelectTrigger className="cursor-pointer w-fit border-none shadow-none focus-visible:border-none focus-visible:ring-0">
        <SelectValue placeholder={activeCurrencyCode} />
      </SelectTrigger>
      <SelectContent className="w-70">
        {data.map((item) => (
          <SelectItem key={item.currencyCode} value={item.currencyCode}>
            <div className="flex items-center gap-2 py-2">
              <div
                className="w-5 h-5 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.flagUrl})` }}
              />
              <span className="text-sm">
                {item.countryName} ({item.currencyCode} {item.currencySymbol})
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountryList;
