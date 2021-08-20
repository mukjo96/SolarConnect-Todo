export const validateText = (text: string): string => {
    if (!text) return "내용을 입력해주세요";
    if (!text.trim()) return "내용을 입력해주세요";
    if (text.length > 200) return "내용은 200자 이하로 작성해주세요.";
    return "success";
};
