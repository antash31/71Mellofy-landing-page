"use client";
import React from "react";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function ConfirmSDRModal({
    isOpen,
    onClose,
    onConfirm,
    formData,
    selectedEmailAccount,
    isLoading
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-black/95 backdrop-blur-xl border border-white/20 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-yellow-500" />
                        Confirm SDR Agent Creation
                    </DialogTitle>
                    <DialogDescription className="text-white/70">
                        Please review the details before creating your AI SDR Agent.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                    {/* Configuration Summary */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            Configuration Summary
                        </h3>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-white/60">Target Domain:</span>
                                <span className="text-white font-medium">{formData.domain}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-white/60">Email Account:</span>
                                <span className="text-white font-medium">{selectedEmailAccount?.email_address}</span>
                            </div>

                            {formData.meetingLink && (
                                <div className="flex justify-between items-center">
                                    <span className="text-white/60">Meeting Link:</span>
                                    <span className="text-white font-medium truncate max-w-[200px]">
                                        {formData.meetingLink}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="text-yellow-500 font-semibold mb-2">Important Notice</h4>
                                <ul className="text-white/80 text-sm space-y-1">
                                    <li>• Your AI SDR will start prospecting immediately after creation</li>
                                    <li>• Outreach campaigns will begin within 24 hours</li>
                                    <li>• Make sure your email account is properly configured</li>
                                    <li>• You cannot modify the domain or email account after creation</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={onConfirm}
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Creating...
                                </div>
                            ) : (
                                "Create SDR Agent"
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
