"use client";

// @refresh reset
import { useReducer } from "react";
import { ContractReadMethods } from "./ContractReadMethods";
import { ContractVariables } from "./ContractVariables";
import { ContractWriteMethods } from "./ContractWriteMethods";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { ContractName } from "~~/utils/scaffold-eth/contract";

type ContractUIProps = {
  contractName: ContractName;
  className?: string;
};

/**
 * UI component to interface with deployed contracts.
 **/
export const ContractUI = ({ contractName, className = "" }: ContractUIProps) => {
  const [refreshDisplayVariables, triggerRefreshDisplayVariables] = useReducer(value => !value, false);
  const { targetNetwork } = useTargetNetwork();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo({ contractName });
  const networkColor = useNetworkColor();

  if (deployedContractLoading) {
    return (
      <div className="mt-14">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!deployedContractData) {
    return (
      <p className="text-3xl mt-14">
        {`No contract found by the name of "${contractName}" on chain "${targetNetwork.name}"!`}
      </p>
    );
  }

  return (
    <div className={`w-full max-w-6xl px-6 lg:px-10 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-8 lg:gap-10">
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-base-300/70 bg-base-100 px-6 py-4 shadow-[0_0_28px_-20px_rgba(255,38,112,0.35)]">
            <div className="flex flex-col gap-1">
              <span className="font-bold">{contractName}</span>
              <Address address={deployedContractData.address} onlyEnsOrAddress />
              <div className="flex gap-1 items-center">
                <span className="font-bold text-sm">Balance:</span>
                <Balance address={deployedContractData.address} className="px-0 h-6 min-h-[1.5rem] shadow-none" />
              </div>
            </div>
            {targetNetwork && (
              <p className="my-1 text-sm text-base-content/80">
                <span className="font-bold text-base-content">Network</span>:{" "}
                <span style={{ color: networkColor }}>{targetNetwork.name}</span>
              </p>
            )}
          </div>
          <div className="rounded-3xl border border-base-300/70 bg-base-100 px-6 py-4 shadow-[0_0_28px_-22px_rgba(174,183,203,0.35)]">
            <ContractVariables
              refreshDisplayVariables={refreshDisplayVariables}
              deployedContractData={deployedContractData}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="relative rounded-3xl border border-base-300/70 bg-base-100 pt-7 shadow-[0_0_30px_-20px_rgba(255,38,112,0.25)]">
            <div className="absolute -top-4 left-5 rounded-2xl bg-primary px-4 py-1 text-xs font-semibold text-primary-content shadow-[0_6px_16px_rgba(255,38,112,0.35)]">
              Read
            </div>
            <div className="px-5 pb-5 pt-2 divide-y divide-base-300/70">
              <ContractReadMethods deployedContractData={deployedContractData} />
            </div>
          </div>
          <div className="relative rounded-3xl border border-base-300/70 bg-base-100 pt-7 shadow-[0_0_30px_-20px_rgba(255,38,112,0.25)]">
            <div className="absolute -top-4 left-5 rounded-2xl bg-primary px-4 py-1 text-xs font-semibold text-primary-content shadow-[0_6px_16px_rgba(255,38,112,0.35)]">
              Write
            </div>
            <div className="px-5 pb-5 pt-2 divide-y divide-base-300/70">
              <ContractWriteMethods
                deployedContractData={deployedContractData}
                onChange={triggerRefreshDisplayVariables}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
