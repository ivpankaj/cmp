import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface CustomPhoneInputProps {
  value: { countryCode: string; number: string; fullNumber: string };
  onChange: (phone: { countryCode: string; number: string; fullNumber: string }) => void;
  isEditing: boolean;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({ value, onChange, isEditing }) => {
  const dropdownStyles = `
    .react-tel-input .country-list {
      background-color: black !important;
      color: white !important;
    }
    .react-tel-input .country-list .country:hover {
      background-color: #1f2937 !important;
    }
    .react-tel-input .country-list .country.highlight {
      background-color: #374151 !important;
    }
    .react-tel-input .country-list .search {
      background-color: black !important;
      color: white !important;
    }
    .react-tel-input .country-list .search::placeholder {
      color: #6b7280 !important;
    }
  `;
  return (
    <div className="w-full">
      <style>{dropdownStyles}</style>
      <label className="block text-sm font-medium text-gray-200 mb-2">
        Phone Number
      </label>
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
        disabled={!isEditing}
        inputStyle={{
          width: '100%',
          height: '42px',
          fontSize: '16px',
          backgroundColor: 'black',
          border: '1px solid rgb(55, 65, 81)',
          color: 'white',
          borderRadius: '0.375rem',
        }}
        buttonStyle={{
          backgroundColor: 'black',
          border: '1px solid rgb(55, 65, 81)',
          borderRadius: '0.375rem 0 0 0.375rem',
        }}
        dropdownStyle={{
          backgroundColor: 'black',
          color: 'white',
        }}
        searchStyle={{
          backgroundColor: 'black',
          color: 'white',
          borderColor: 'rgb(55, 65, 81)',
        }}
        containerClass={`${!isEditing ? 'opacity-50' : ''}`}
        enableSearch={true}
        searchPlaceholder="Search country..."
        inputClass="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        countryCodeEditable={false}
      />
    </div>
  );
};

export default CustomPhoneInput;