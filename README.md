# codengage-lab

## Get start

1. First clone:

```bash
$ git clone git@github.com:codengage/codengage-lab.git
$ cd ./codengage-lab
$ yarn
```

2. To run commands on packages use `yarn worksace` commands

```bash
$ yarn workspace @codengage/<package> <command>
// or use cli like tsc and ts-node
$ yarn workspace @codengage/<package> run <command>
```

3. Run api example project

```bash
$ yarn workspace @codengage/api build
$ yarn workspace @codengage/api dev
```
