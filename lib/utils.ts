import { toast } from "react-toastify";

export const copyFunction = async (text: string) => {

    const textCopied = await navigator.clipboard.writeText(text);
    toast.success("Copied successfully");
    return textCopied;
}

export const sliceAddress = (address: string | undefined) => {
    if (!address) return "---";
    return address.slice(0,6)+'...'+address.slice(-4)
}