class IncludeComponentElement extends HTMLElement {
  constructor() {
    super();
  }
}

function includeComponent(componentId, componentPath) {
  const container = document.getElementById(componentId);
  // container.dataset.component = componentPath;

  fetch(componentPath)
    .then(response => response.text())
    .then(data => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;

      const newElement = tempDiv.firstChild;
      container.replaceWith(newElement);

      // include component js
      const script = document.createElement('script');
      script.src = componentPath.replace('.html', '.js');
      document.body.appendChild(script);
    })
    .catch(error => console.error('Error fetching component:', error));

}

customElements.define('include-component', IncludeComponentElement);