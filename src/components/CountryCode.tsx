import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface CustomPhoneInputProps {
  value: { countryCode: string; number: string; fullNumber: string };
  onChange: (phone: { countryCode: string; number: string; fullNumber: string }) => void;
  isEditing: boolean;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({ value, onChange, isEditing }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (dropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [dropdownOpen]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
      <PhoneInput
        country="in"
        value={value?.fullNumber || ''}
        onChange={(phone: string, countryData: { dialCode: string }) => {
          onChange({
            countryCode: `+${countryData.dialCode}`,
            number: phone.slice(countryData.dialCode.length),
            fullNumber: `+${phone}`
          });
        }}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setTimeout(() => setDropdownOpen(false), 300)}
        disabled={!isEditing}
        inputStyle={{
          width: '100%',
          height: '42px',
          fontSize: '16px',
          backgroundColor: 'black',
          border: '1px solid rgb(31, 41, 55)',
          color: 'white',
          borderRadius: '0.375rem',
        }}
        buttonStyle={{
          backgroundColor: 'black',
          border: '1px solid rgb(31, 41, 55)',
          borderRadius: '0.375rem 0 0 0.375rem',
        }}
        dropdownStyle={{
          backgroundColor: 'black',
          color: 'white',
          maxHeight: '200px',
          overflowY: 'auto',
        }}
        searchStyle={{
          backgroundColor: 'black',
          color: 'white',
          borderColor: 'rgb(31, 41, 55)',
        }}
        containerClass={!isEditing ? 'opacity-50' : ''}
        enableSearch={true}
        searchPlaceholder="Search country..."
        inputClass="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        countryCodeEditable={false}
      />
      <style>
        {`
        .react-tel-input .country-list {
          background-color: black !important;
          color: white !important;
        }
        .react-tel-input .country-list .country {
          background-color: black !important;
          color: white !important;
        }
        .react-tel-input .country-list .country:hover {
          background-color: #000 !important; /* Black */
          color: white !important; /* White text */
        }
        .react-tel-input .country-list .country.highlight {
          background-color: #111 !important; /* Darker black */
          color: white !important;
        }
        .react-tel-input .country-list .search {
          background-color: black !important;
          color: white !important;
          border-color: rgb(31, 41, 55) !important;
        }
        .react-tel-input .country-list .search::placeholder {
          color: #6b7280 !important;
        }
        `}
      </style>
    </div>
  );
};

export default CustomPhoneInput;
