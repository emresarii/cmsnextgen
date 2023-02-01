import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Table,
  TextInput,
} from "@mantine/core";
import { User } from "../../../lib/types";
import { useEffect, useState } from "react";
import axios from "../../../lib/api/axios";
import LayoutAdmin from "../../../layout/admin";
import { useForm } from "@mantine/form";

export default function Demo() {
  const form = useForm({
    initialValues: {
      email: "",
      admin: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const [users, setUsers] = useState<User[]>([]);
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const users = await axios.get("/users");
      setUsers(users.data.users);
    })();
  }, []);

  useEffect(() => {
    form.setValues({ email: user?.email, admin: user?.admin ?? false });
  }, [user]);

  const rows = users?.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.admin}</td>
      <td style={{ textAlign: "center" }}>
        <Button
          onClick={() => {
            setOpened(true);
            setUser(user);
          }}
        >
          Edit
        </Button>
      </td>
    </tr>
  ));

  const onSubmitUser = async (values: any) => {
    try{await axios.post("/user/", { id: user?.id, ...values })}
    catch{

    }
  };

  return (
    <LayoutAdmin>
      <Modal
        opened={opened && !!user}
        onClose={() => setOpened(false)}
        title=""
      >
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={form.onSubmit(onSubmitUser)}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <Checkbox
              mt="md"
              label="Admin"
              {...form.getInputProps("admin", { type: "checkbox" })}
            />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </LayoutAdmin>
  );
}
