/*
 * Client-safe registry constants (lib/docs.ts is build-time only). Named JSON imports let the
 * bundler keep just these two fields of the manifest.
 */
import { homepage, name } from "@paneui/registry/manifest.json"

export const REGISTRY_NAME: string = name
export const SITE_URL: string = (typeof process !== "undefined" && process.env?.SITE_URL) || homepage
export const REGISTRY_URL = `${SITE_URL}/r/{name}.json`
