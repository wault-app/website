/**
 * Based on a Stackoverflow comment
 * https://stackoverflow.com/a/30810322
 */
export default class Clipboard {
    public static async copy(text: string) {
        if (!navigator.clipboard) {
            return this.fallback(text);
        }

        return await navigator.clipboard.writeText(text);
    }

    private static fallback(text: string) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }

}