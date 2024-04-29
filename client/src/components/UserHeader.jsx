import { Box, VStack, Flex, Text, Link } from "@chakra-ui/layout";
import { Avatar, useToast, Button } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { useState } from "react";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom);
  console.log(currentUser);
  const [following, setFollowing] = useState(user.followers.includes(currentUser.user_id));
  const showToast = useShowToast();
  const [updating, setUpdating] = useState(false);


  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Success.",
        status: "success",
        description: "Profile link copied.",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const handleFollow = async() => {

    //console.log("tran anh duc");

    if (!currentUser) {
      showToast("Error", "please loggin to follow", "error");
        return;
    }
    if (updating) {
      return;
    }
    setUpdating(true);



    try {
      const res = await fetch(`http://localhost:1000/user/${username}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })

      const data = await res.json();
      // if (data.error) {
      //   showToast("Error", error, "error");
      //   return;
      // }

      // if (following) {
      //   showToast("Success", `Unfollowed ${user.full_name}`, "success" );
      //   user.followers.pop();
      // } else {
      //   showToast("Success", `followed ${user.full_name}`, "success" );
      //   user.followers.push(currentUser.user_id)
      // }
      setFollowing(!following); // change text in follow button

    } catch (error) {
      showToast("Error", error, "error")
    } finally {
      setUpdating(false);
    }
  }

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user?.full_name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user?.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              thread.next
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name={user?.full_name}
            src={user?.profile_image_url}
            size={{
              base: "md",
              md: "xl",
            }}
          />
        </Box>
      </Flex>
      <Text>{user?.bio}</Text>
      {currentUser.user_id === user?.user_id && (
        <Link as={RouterLink} to={"/update"}>
        <Button size={"sm"}> Update Profile </Button>
      </Link>
      )}
      {currentUser.user_id !== user?.user_id && (
        <Button size={"sm"} onClick={handleFollow}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user?.followers} followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Thread</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1.5px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
