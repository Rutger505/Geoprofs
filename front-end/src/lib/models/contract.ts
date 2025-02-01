"use server";

import axios from "@/lib/axios";
import { AxiosError } from "axios";

export interface Contract {
  id: number;
  name: number;
  totalLeaveHours: string;
  created_at: string;
  updated_at: string;
}

export interface ApiContractsResponse {
  existsInUserContract: Contract[]; // boundContracts
  notExistsInUserContract: Contract[]; // notBoundContracts
}

export async function getContracts(): Promise<Contract[]> {
  const response = await axios.get<ApiContractsResponse>("/contract/show");
  const boundContracts = response.data.existsInUserContract;
  const notBoundContracts = response.data.notExistsInUserContract;

  return boundContracts.concat(notBoundContracts);
}

export async function createContract(
  contractName: string,
  contractLeaveHours: number,
) {
  try {
    await axios.post("/contract/store", {
      contractName,
      contractLeaveHours,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      console.error(error.response?.data);
    }

    return { error: "Er is iets misgegaan" };
  }
}
