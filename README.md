<div id="top" />

<br />
<div align="center">
  <a href="https://github.com/devtobias/trophoria">
    <img src="https://raw.githubusercontent.com/devtobias/trophoria/main/.github/brand/brand.png" width="500" alt="trophoria logo" />
  </a>

  <br />
  <br />

  <p align="center">
    Open source PlayStation trophy platform with modern design wich aims to fit the needs of every passionate trophy hunter.
    <br />
    <a href="https://github.com/devtobias/trophoria"><strong>« Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/devtobias/trophoria/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/devtobias/trophoria/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=">Request Feature</a>
  </p>

  <p align="center">
  	<a href="https://github.com/devtobias/trophoria/blob/main/LICENSE" title="license">
			<img src="https://img.shields.io/github/license/devtobias/trophoria?style=for-the-badge" alt="license" />
		</a>
    <a href="https://sonarcloud.io/summary/new_code?id=DevTobias_trophoria" title="static code analysis">
      <img src="https://sonarcloud.io/images/project_badges/sonarcloud-white.svg" alt="static code analysis" height="29px"/>
    </a>
  </p>
</div>

## 👋 Getting started

Welcome to trophoria! If you want to look how we implemented the application or even want to contribute to it, you are absolutely in the right place. This is out main repository which contains the backend and frontend implementations.

> ⚠️ Important
>
> If you want to contribute to our community projects, we advice you to fist read through our wiki pages because there we describe things like: setting up the dev > environment, which technologies we used and how open source even works on GitHub. Also this repository itself contain more useful information like pull request templates, security guidelines and so on. Make sure to read those too (inside the .github folder)! And now, happy coding! 🎉

<p align="right">(<a href="#top">back to top</a>)</p>

## 🧑‍💻 Development

To setup the dev environment, you need to make sure to have the following tools installed on your system first. Keep in mind, that bun can only be installed on Linux based systems for the time being. If you are on windows, make sure you setup this repository inside of wsl2.

- [docker](https://www.docker.com/) - Needed for development containers (database)
- [bun](https://bun.sh/) - Fast and modern JavaScript runtime environment
- (optional) [Taskfile](https://taskfile.dev/installation/) - If you decide to not install it, you have to type in every command you want to use from `Taskfile.yml` files manually in your command line. It is encouraged to use this utility.

You can install all the dependencies of the projects with this simple command: task run -- install. If you don't want to install all dependencies of all projects, navigate to the desired one and run bun install.

This repository uses environment files to store secret credentials like api tokens, crypto keys or database passwords. Create the following files by copying the matching `.env.template` file and fill the empty spaces and/or adjust the other values as you like.

- `backend/app/.env.development`

Now we have to setup all needed background services like databases with the `task setup` command.

If all services are ready, you can now move on to start the actually backend development server inside the `backend/app` directory with `bun start`.

<p align="right">(<a href="#top">back to top</a>)</p>

## 👥 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this project better, please fork the repo and create a pull request. Don't forget to give the project a star! Thanks again! But before you get started, please see the following pages first:

- [Code of Conduct](.github/CODE_OF_CONDUCT.md)
- [Contributing Guidelines](.github/CONTRIBUTING.md)

You can also take a look at the already linked wiki pages to find a few guides on how to work with the repository technologies and so on. We also included a pull request template which includes a pretty large checklist of things, you should already fulfill before creating a merge request, to keep the review time as small as possible!

<p align="right">(<a href="#top">back to top</a>)</p>

## 🪲 Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. More information about issue reporting contributing are found in the [Contributing](./.github/CONTRIBUTING.md) guidelines.

<p align="right">(<a href="#top">back to top</a>)</p>

## 🔓 License

All of my software is distributed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## 💌 Contact

If you are interested in connecting with me, don't hesitate to do so. Either write me an email to [privat@tobias-kaerst.de](mailto:privat@tobias-kaerst.de) or connect with me via [discord](https://discord.gg/qWPyFWkff6).

<p align="right">(<a href="#top">back to top</a>)</p>
