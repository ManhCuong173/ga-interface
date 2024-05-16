import { StaticImport } from "next/dist/shared/lib/get-img-props"


export type FiveElements = {
    id: number,
    title: string,
    icon: string | StaticImport,
    type: string | StaticImport,

}