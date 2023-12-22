import { PluginView } from '../@types/Plugin';

function parseNodeSchema(schema: PluginView): HTMLElement {
  const el = document.createElement(schema.tag);

  schema.attributes?.forEach(attr => {
    el.setAttribute(attr.key, attr.value);
  });

  if(typeof schema.childs === 'string') {
    el.innerHTML = schema.childs;
    return el;
  } else if(Array.isArray(schema.childs)) {
    schema.childs.forEach(child => {
      const subEl = parseNodeSchema(child);
      el.appendChild(subEl);
    });
    return el;
  } else if((schema.childs as HTMLElement).outerHTML) {
    el.appendChild(schema.childs as HTMLElement);
    return el;
  } else {
    const subEl = parseNodeSchema(schema.childs as PluginView);
    el.appendChild(subEl);
    return el;
  }
}

export function NodeView(schema: PluginView): HTMLElement {
  const view = parseNodeSchema(schema);
  return view;
}