## Stuff I've learned
### HTML:
- ``<a href="https://github.com/Nathanos56/CS260-Startup">My GitHub Repo</a>``
- ``<img src="inmglinkhere" alt="doggo" width="150">``
- ``<button type="button">Click Me!</button>``
- space: ``&nbsp``
- **``<div class="card shadow p-5 mb-5 mt-5 bg-white mx-auto" style="max-width: 70vw; border-radius: 1.3rem;"></div>``**

### CSS
- ``@media (max-width: 810px) {}``
- ``test``   selects the HTML element "test"
- ``.test``  selects the class "test"
- ``#test``  selects the object with the id "test"
- ``svh`` & ``dvh``

### JavaScript
- ``localStorage.setItem("lightSwitch", "dark");``
- ``document.querySelector('.navbar').classList.remove('navbar-light', 'bg-light');``
- ``document.getElementById('dropdown-img-main').src = 'bootstrap-icons/sun-fill.svg';``
- ``allHTML.dataset.bsTheme = mode;``
- ``function DarkModeDefault() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {return "dark"} else {return "light"}
}``

### SSH
- ``ssh -i [key pair file] ubuntu@[yourdomainnamehere]``
### Other
- ``./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup``    Use git-bash
- ``./deployService.sh -k <yourpemkey> -h <yourdomain> -s startup``  use git-bash

## Checklist:
- [X] Set up AWS
- [X] HTTPS
- [X] Startup HTML
- [X] Startup CSS
- [X] Startup JavaScript
- [ ] Startup WebSocket
- [ ] Startup React
