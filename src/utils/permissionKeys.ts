import { Permissions } from "types/types";

export function permissionKey(resource: string, action: string): string {
    return `${resource}:${action}`
}

export function buildPermsSet(rows: Permissions[]): Set<string> {
    const perms = new Set<string>()
    for (const p of rows) {
        perms.add(`${p.resource}:${p.action}`)
    }
    return perms
}