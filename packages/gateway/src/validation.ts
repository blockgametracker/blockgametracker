import { MinecraftEdition } from "./types/api"

/** Returns the edition as a `MinecraftEdition`, or `def` if `edition` is not a valid `MinecraftEdition`. */
export const getEditionOrDefault = (
    edition?: string,
    def: MinecraftEdition = MinecraftEdition.JAVA,
): MinecraftEdition =>
    edition &&
    Object.values(MinecraftEdition).includes(edition as MinecraftEdition)
        ? (edition as MinecraftEdition)
        : def
