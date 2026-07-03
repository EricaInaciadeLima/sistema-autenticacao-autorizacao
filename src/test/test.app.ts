import { createApp } from "../../app";
import express, { Express } from "express";

export interface TestContext{
    app:Express;
} 
export function buildTestApp(): TestContext {
    const app = createApp();
    return {app};
}
