import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface CoordinateInputProps {
  label: string;
  lat: string;
  lon: string;
  onLatChange: (value: string) => void;
  onLonChange: (value: string) => void;
}

export const CoordinateInput = ({
  label,
  lat,
  lon,
  onLatChange,
  onLonChange,
}: CoordinateInputProps) => {
  return (
    <FormControl mb={4}>
      <FormLabel>{label}</FormLabel>
      <Input
        placeholder="Latitud"
        value={lat}
        onChange={(e) => onLatChange(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Longitud"
        value={lon}
        onChange={(e) => onLonChange(e.target.value)}
      />
    </FormControl>
  );
};
