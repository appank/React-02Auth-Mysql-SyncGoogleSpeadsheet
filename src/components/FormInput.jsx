import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

const FormInput = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    
  };

  return (
    <Box bg="white" p="20px" borderRadius="lg" boxShadow="sm">
      <FormControl mb="15px">
        <FormLabel color="black">Full Name</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          color="black"
        />
      </FormControl>
      <FormControl mb="15px">
        <FormLabel color="black">Email</FormLabel>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          color="black"
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default FormInput;