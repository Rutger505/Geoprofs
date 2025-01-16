import axios from "@/lib/axios";

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
