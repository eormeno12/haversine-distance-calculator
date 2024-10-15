"use client";

import { CityDistanceCalculator } from "@/components/Cities/CityDistanceCalculator";
import { CoordDistanceCalculator } from "@/components/Cities/CoordDistanceCalculator";
import {
  Box,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [distance, setDistance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTabChange = () => {
    setDistance(null);
  };

  return (
    <Container maxW="lg" py={10}>
      <Box boxShadow="md" borderRadius="md" p={6} bg="gray.50">
        <Heading as="h2" size="lg" textAlign="center" mb={8}>
          Calculadora de Distancia
        </Heading>

        <Tabs
          variant="soft-rounded"
          colorScheme="teal"
          onChange={handleTabChange}
        >
          <TabList justifyContent="center" mb={6}>
            <Tab>Por Ciudad</Tab>
            <Tab>Por Coordenadas</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CityDistanceCalculator
                onDistanceCalculated={setDistance}
                loading={loading}
                setLoading={setLoading}
              />
            </TabPanel>

            <TabPanel>
              <CoordDistanceCalculator
                onDistanceCalculated={setDistance}
                loading={loading}
                setLoading={setLoading}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>

        {distance !== null && (
          <Text mt={8} textAlign="center" fontSize="xl" fontWeight="medium">
            La distancia calculada es de{" "}
            <strong>{distance.toFixed(2)} km</strong>.
          </Text>
        )}
      </Box>
    </Container>
  );
}
