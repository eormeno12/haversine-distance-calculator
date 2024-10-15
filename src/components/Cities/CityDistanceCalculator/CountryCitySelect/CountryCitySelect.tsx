import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { City, Country } from "country-state-city";
import { useEffect, useState } from "react";

interface CountryCitySelectProps {
  label: string;
  selectedCountry: string;
  selectedCity: string;
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
}

export const CountryCitySelect = ({
  label,
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange,
}: CountryCitySelectProps) => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const countries = Country.getAllCountries();

  useEffect(() => {
    const loadCities = async () => {
      if (selectedCountry) {
        setLoading(true);
        const selectedCountryCode = countries.find(
          (country) => country.name === selectedCountry
        )?.isoCode;

        if (selectedCountryCode) {
          const cityList = City.getCitiesOfCountry(selectedCountryCode);
          const cityNames = cityList.map((city) => city.name);
          setCities(cityNames);
        } else {
          setCities([]);
        }

        setLoading(false);
      } else {
        setCities([]);
      }
    };

    loadCities();
  }, [selectedCountry, countries]);

  return (
    <>
      <FormControl mb={4}>
        <FormLabel>{label} - País</FormLabel>
        <Select
          placeholder="Seleccione un país"
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          {countries.map(({ isoCode, name }) => (
            <option key={isoCode} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4} isDisabled={!selectedCountry || loading}>
        <FormLabel>{label} - Ciudad</FormLabel>
        <Select
          placeholder="Seleccione una ciudad"
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
        >
          {cities.map((cityName, idx) => (
            <option key={idx} value={cityName}>
              {cityName}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
