export class AUTH_PERMISSIONS {
    //----------------------
    //      Permissions
    //----------------------
    public static readonly User = {
        Code: "1",
        Permissions: {
            FindOneById: "1",
            Create: "2"
        }
    };
    //----------------------
    //----------------------
    public static makePermissionString(code: string, permision: string): string {
        return `${code}-${permision}`;
    }

    public static makeArrayOfPermissionForFindOneByIdQuery(): string[] {
        const a = Object.values(AUTH_PERMISSIONS);
        const str: string[] = [];
        a.forEach(val => {
            const o = Object.assign({}, val);
            if ("Code" in o) {
                const c = o.Code;
                if ("Permissions" in o) {
                    const p = o.Permissions;
                    if ("FindOneById" in p) {
                        const f = p.FindOneById;
                        str.push(AUTH_PERMISSIONS.makePermissionString(c, f));
                    }
                }
            }
        });
        return str;
    }

    public static makeSuperAdminPermissions(): string {
        const a = Object.values(AUTH_PERMISSIONS);
        let permissionString = "";
        a.forEach(val => {
            const o = Object.assign({}, val);
            if ("Code" in o) {
                const c = o.Code;
                if ("Permissions" in o) {
                    const p = o.Permissions;
                    Object.entries(p).forEach(
                        ([key, val]) => {
                            permissionString += AUTH_PERMISSIONS.makePermissionString(c, <string>val) + "/";
                        });
                }
            }
        });
        permissionString = permissionString.slice(0, -1);
        return permissionString;
    }
}