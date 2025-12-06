/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Agent } from "http";
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewAgentDialog = ({
  open,              
  onOpenChange,      
}: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog title="New Agent" description="Create a new agent" open={open} onOpenChange={onOpenChange}>  
        <AgentForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
    </ResponsiveDialog>
  )
}