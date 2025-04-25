import {
    Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { FiSearch } from "react-icons/fi"; // Icon search dari react-icons
  
  const WriteTable = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/profil");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  
    // Filter data berdasarkan search
    const filteredData = data.filter(
      (item) =>
        item.Nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <Box bg="white" p={5} borderRadius="lg" boxShadow="md" overflowX="auto">
        {/* Search input */}
        <Box mb={4}>
        <Flex justify="space-between" align="center" mb={4}>
  <Box fontWeight="bold" fontSize="xl">
    Daftar Data
  </Box>
  <InputGroup width="250px">
    <InputLeftElement pointerEvents="none">
      <FiSearch color="gray" />
    </InputLeftElement>
    <Input
         placeholder="Search....."
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         bg="gray.50"
         borderRadius="md"
         boxShadow="sm"
         focusBorderColor="blue.400"
    />
  </InputGroup>
</Flex>

      
        </Box>
  
        <Box maxHeight="63vh" overflowY="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Nama</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((item, i) => (
                <Tr key={item.id}>
                  <Td color="black">{i + 1}</Td>
                  <Td color="black">{item.Nama}</Td>
                  <Td color="black">{item.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    );
  };
  
  export default WriteTable;
  