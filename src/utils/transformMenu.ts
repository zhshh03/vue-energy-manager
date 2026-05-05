export const transformMenu = (nodes:any) => {
  return nodes.map((node:any) => {
    const newNode:any = {
      label:node.name,
      url:node.url,
      children: node.children ? transformMenu(node.children) : null,
    }
    if(node.children) {
      newNode.children = transformMenu(node.children)
    }
    return newNode
  });
};
