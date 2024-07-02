import { backupEvents } from "@/app/admin/actions";
import { useQuery } from "@tanstack/react-query";
export function useQueryBackup() {

    const q = useQuery({
        queryKey: ["backup", "events"],
        // queryFn: getBackupEvents.bind(null),
        queryFn: backupEvents,
    });

    return q
}