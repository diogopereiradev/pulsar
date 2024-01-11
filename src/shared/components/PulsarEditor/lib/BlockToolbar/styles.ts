import { EditorStyles } from '../../@types/Editor';

export function BlockToolbarStyles(): EditorStyles {
  return {
    id: 'block-toolbar-styles',
    css: (editor) => /* css */ `
      .pe--tb--blocksmenu {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: absolute;
        top: 35px;
        left: 5px;
        width: 200px;
        background-color: ${editor.theme.secondary};
        border-radius: 6px;
        padding: 6px;
        box-shadow: 1px 1px 8px -4px #101010;
        opacity: 0;
        pointer-events: none;
        transform: scale(0.8);
        transform-origin: left top;
        transition: .3s;
        z-index: 999;
      }

      .pe--tb--blocksmenu--open {
        opacity: 1;
        pointer-events: auto;
        transform: scale(1);
      }

      .pe--tb--blocksmenu--search {
        display: flex;
        align-items: center;
      }

      .pe--tb--blocksmenu--search--input {
        width: 100%;
        min-height: 35px;
        border-radius: 6px;
        font-size: 14px;
        background-color: ${editor.theme.text}10;
        padding-left: 40px;
        padding-right: 10px;
        color: ${editor.theme.text};
      }

      .pe--tb--blocksmenu--search--input:focus-visible {
        outline: 2px solid ${editor.theme.primary};
      }

      .pe--tb--blocksmenu--search--input::placeholder {
        color: ${editor.theme.text}60;
      }

      .pe--tb--blocksmenu--search--icon {
        position: absolute;
        left: 18px;
        font-size: 14px;
        color: ${editor.theme.text}80;
      }

      .pe--tb--blocksmenu--item {
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 32px;
        gap: 10px;
        word-break: keep-all;
        padding: 4px;
        padding-left: 6px;
        transition: .3s;
      }

      .pe--tb--blocksmenu--item:hover {
        background-color: ${editor.theme.text}10;
        border-radius: 8px;
      }

      .pe--tb--blocksmenu--item--icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 26px;
        font-size: 11px;
        border: 1px solid ${editor.theme.text}20;
        border-radius: 9px;
        color: ${editor.theme.text};
      }

      .pe--tb--blocksmenu--item--text {
        color: ${editor.theme.text};
        font-size: 14px;
      }

      .pe--tb--blocksmenu--notfound--container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 32px;
      }

      .pe--tb--blocksmenu-notfound-message {
        color: ${editor.theme.text}80;
        font-size: 14px;
      }

      .pe--tb--actionsmenu {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: absolute;
        top: 35px;
        left: 25px;
        width: 200px;
        background-color: ${editor.theme.secondary};
        border-radius: 6px;
        padding: 6px;
        box-shadow: 1px 1px 8px -4px #101010;
        opacity: 0;
        pointer-events: none;
        transform: scale(0.8);
        transform-origin: left top;
        transition: .3s;
        z-index: 999;
      }

      .pe--tb--actionsmenu--open {
        opacity: 1;
        pointer-events: auto;
        transform: scale(1);
      }

      .pe--tb--actionsmenu--search {
        display: flex;
        align-items: center;
      }

      .pe--tb--actionsmenu--search--input {
        width: 100%;
        min-height: 35px;
        border-radius: 6px;
        font-size: 14px;
        background-color: ${editor.theme.text}10;
        padding-left: 40px;
        padding-right: 10px;
        color: ${editor.theme.text};
      }

      .pe--tb--actionsmenu--search--input:focus-visible {
        outline: 2px solid ${editor.theme.primary};
      }

      .pe--tb--actionsmenu--search--input::placeholder {
        color: ${editor.theme.text}60;
      }

      .pe--tb--actionsmenu--search--icon {
        position: absolute;
        left: 18px;
        font-size: 14px;
        color: ${editor.theme.text}80;
      }

      .pe--tb--actionsmenu--item {
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 32px;
        gap: 10px;
        word-break: keep-all;
        padding: 4px;
        padding-left: 6px;
        transition: .3s;
      }

      .pe--tb--actionsmenu--item:hover {
        background-color: ${editor.theme.text}10;
        border-radius: 8px;
      }

      .pe--tb--actionsmenu--item--icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 26px;
        font-size: 11px;
        border: 1px solid ${editor.theme.text}20;
        border-radius: 9px;
        color: ${editor.theme.text};
      }

      .pe--tb--actionsmenu--item--text {
        color: ${editor.theme.text};
        font-size: 14px;
      }

      .pe--tb--actionsmenu--notfound--container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 32px;
      }

      .pe--tb--actionsmenu-notfound-message {
        color: ${editor.theme.text}80;
        font-size: 14px;
      }
    `
  }
}