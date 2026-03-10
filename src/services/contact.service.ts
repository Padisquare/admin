import { requestHandler } from "@/utils/requestHandler";
import { ContactDto } from "@/types/contact.type";

export const contactRequest = async (data: ContactDto) => {
  return await requestHandler("post", "/contact", data);
};
