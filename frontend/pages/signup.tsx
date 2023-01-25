import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import axios from "../lib/api/axios";
import { useForm } from "@mantine/form";
import { showNotification } from '@mantine/notifications';
import { AxiosError } from "axios";


export default function AuthenticationTitle() {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/.test(value)
          ? null
          : "Invalid password",
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Register
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit (async (values) =>  {
          try {const data = await axios.post("/signup", values)
          if (data.data.message) {
          }}
          catch (e: Error | AxiosError | any){
            console.log(e)
            showNotification({
              title: 'Default notification',
              message: e.response.data.message,
            })
          }
          })}>
          <TextInput
            label="Name"
            placeholder="Name Surname"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            mt="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button fullWidth mt="26px" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
