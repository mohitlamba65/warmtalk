import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Match {
    id: string;
    clientName: string;
    providerName: string;
    status: string;
    score: number;
}

interface OverrideMatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    match: Match | null;
    onConfirm: (matchId: string, newProviderId: string) => void;
}

export function OverrideMatchModal({ isOpen, onClose, match, onConfirm }: OverrideMatchModalProps) {
    const [newProviderId, setNewProviderId] = useState("");

    const handleConfirm = () => {
        if (match && newProviderId) {
            onConfirm(match.id, newProviderId);
            onClose();
        }
    };

    if (!match) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Override Match</DialogTitle>
                    <DialogDescription>
                        Manually reassign <strong>{match.clientName}</strong> to a different provider.
                        Current provider: {match.providerName}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="provider">New Provider</Label>
                        <Select onValueChange={setNewProviderId} value={newProviderId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a provider" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="provider-a">Dr. Sarah Chen (98% Match)</SelectItem>
                                <SelectItem value="provider-b">Marcus Johnson (95% Match)</SelectItem>
                                <SelectItem value="provider-c">Elena Rodriguez (Available)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleConfirm} disabled={!newProviderId} className="bg-brand-orange hover:bg-orange-600">
                        Confirm Reassignment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
