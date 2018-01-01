export function GenerateId(prefix = "__reactiver_") {
    if (window.__reactiver) {
        window.__reactiver += 1
    } else {
        window.__reactiver = 1
    }
    return prefix + window.__reactiver
}
