import { Modal } from "antd";

export function errorModal(text: string) {
    Modal.error({
        content: text,
    });
}

export function ellipsisModal(text: string) {
    Modal.info({
        title: "View More",
        content: text,
    });
}
