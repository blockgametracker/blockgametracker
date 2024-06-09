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

/** Returns the range provided, or a default value if the range is invalid. */
export const getRangeOrDefault = <T extends string>(
    range: string | undefined,
    def: T,
): T => {
    const rangeRegex = /^(\+|\-)?\d+(s|m|h|d|y)$/
    if (!range) return def

    return rangeRegex.test(range) ? (range as T) : def
}
