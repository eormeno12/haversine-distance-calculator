import { CountryCitySelect } from "@/components/Cities/CityDistanceCalculator/CountryCitySelect";
import { calcDistance, getCoords } from "@/services/API Routes/cities";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Spinner,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CityDistanceCalculatorProps {
  onDistanceCalculated: (distance: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const CityDistanceCalculator = ({
  onDistanceCalculated,
  loading,
  setLoading,
}: CityDistanceCalculatorProps) => {
  const [country1, setCountry1] = useState("");
  const [city1, setCity1] = useState("");
  const [country2, setCountry2] = useState("");
  const [city2, setCity2] = useState("");
  const [method, setMethod] = useState("api");

  const toast = useToast();

  useEffect(() => setCity1(""), [country1]);
  useEffect(() => setCity2(""), [country2]);

  const handleCalculateDistance = async () => {
    if (!country1 || !city1 || !country2 || !city2) {
      toast({
        title: "Información incompleta",
        description: "Por favor seleccione ambos países y ciudades.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const coords1 = await getCoords(city1, country1, method);
      const coords2 = await getCoords(city2, country2, method);
      const distance = await calcDistance(
        coords1.lat,
        coords1.lon,
        coords2.lat,
        coords2.lon
      );
      onDistanceCalculated(distance);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Ocurrió un error al calcular la distancia",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormControl display="flex" alignItems="center" justifyContent="center" mb={8}>
        <FormLabel htmlFor="method" mb="0">
          Método (API / CSV)
        </FormLabel>
        <Switch
          id="method"
          isChecked={method === "csv"}
          onChange={() => setMethod(method === "api" ? "csv" : "api")}
          colorScheme="teal"
          ml={4}
        />
      </FormControl>

      <CountryCitySelect
        label="Ubicación 1"
        selectedCountry={country1}
        selectedCity={city1}
        onCountryChange={setCountry1}
        onCityChange={setCity1}
      />

      <CountryCitySelect
        label="Ubicación 2"
        selectedCountry={country2}
        selectedCity={city2}
        onCountryChange={setCountry2}
        onCityChange={setCity2}
      />

      <Box mt={4} textAlign="center">
        <Button
          colorScheme="blue"
          onClick={handleCalculateDistance}
          isDisabled={loading}
          size="lg"
          width="100%"
        >
          {loading ? <Spinner size="sm" /> : "Calcular Distancia"}
        </Button>
      </Box>
    </>
  );
};