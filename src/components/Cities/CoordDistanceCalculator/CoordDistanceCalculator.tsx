// components/CoordDistanceCalculator.tsx
import { calcDistance } from "@/services/API Routes/cities";
import { Box, Button, Spinner, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { CoordinateInput } from "./CoordinateInput";

interface CoordDistanceCalculatorProps {
  onDistanceCalculated: (distance: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const CoordDistanceCalculator = ({
  onDistanceCalculated,
  loading,
  setLoading,
}: CoordDistanceCalculatorProps) => {
  const [lat1, setLat1] = useState("");
  const [lon1, setLon1] = useState("");
  const [lat2, setLat2] = useState("");
  const [lon2, setLon2] = useState("");

  const toast = useToast();

  const handleCalculateDistance = async () => {
    if (!lat1 || !lon1 || !lat2 || !lon2) {
      toast({
        title: "Información incompleta",
        description:
          "Por favor ingrese ambas coordenadas de latitud y longitud.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const distance = await calcDistance(
        parseFloat(lat1),
        parseFloat(lon1),
        parseFloat(lat2),
        parseFloat(lon2)
      );
      onDistanceCalculated(distance);
    } catch {
      toast({
        title: "Error",
        description: "Ocurrió un error al calcular la distancia",
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
      <CoordinateInput
        label="Coordenadas de la Ubicación 1"
        lat={lat1}
        lon={lon1}
        onLatChange={setLat1}
        onLonChange={setLon1}
      />
      <CoordinateInput
        label="Coordenadas de la Ubicación 2"
        lat={lat2}
        lon={lon2}
        onLatChange={setLat2}
        onLonChange={setLon2}
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
