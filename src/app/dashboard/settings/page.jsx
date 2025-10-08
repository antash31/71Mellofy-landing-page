"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { campaignService } from "@/services/api";

export default function SettingsPage() {
    const [form, setForm] = useState({
        timezone: "Asia/Kolkata",
        days_of_the_week: "1,2,3,4,5",
        start_hour: "09:00",
        end_hour: "17:00",
        min_time_btw_emails: 15,
        max_new_leads_per_day: 25,
    });
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setStatus("");
        try {
            // Parse days into array of numbers
            const payload = {
                ...form,
                days_of_the_week: form.days_of_the_week
                    .split(",")
                    .map((d) => parseInt(d.trim(), 10))
                    .filter((n) => !Number.isNaN(n)),
                min_time_btw_emails: Number(form.min_time_btw_emails),
                max_new_leads_per_day: Number(form.max_new_leads_per_day),
            };
            await campaignService.updateCampaignSchedule(payload);
            setStatus("Saved successfully");
        } catch (err) {
            setStatus("Failed to save. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Campaign Settings</h1>
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-white/90">Timezone</Label>
                                <Input name="timezone" value={form.timezone} onChange={handleChange} className="bg-black/40 border-white/20 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white/90">Days of the week (comma-separated 0-6)</Label>
                                <Input name="days_of_the_week" value={form.days_of_the_week} onChange={handleChange} className="bg-black/40 border-white/20 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white/90">Start hour (HH:MM)</Label>
                                <Input name="start_hour" value={form.start_hour} onChange={handleChange} className="bg-black/40 border-white/20 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white/90">End hour (HH:MM)</Label>
                                <Input name="end_hour" value={form.end_hour} onChange={handleChange} className="bg-black/40 border-white/20 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white/90">Min minutes between emails</Label>
                                <Input name="min_time_btw_emails" type="number" value={form.min_time_btw_emails} onChange={handleChange} className="bg-black/40 border-white/20 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white/90">Max new leads per day</Label>
                                <Input name="max_new_leads_per_day" type="number" value={form.max_new_leads_per_day} onChange={handleChange} className="bg-black/40 border-white/20 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {saving ? "Saving..." : "Save Settings"}
                            </Button>
                            {status && <span className="text-sm text-white/70">{status}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


