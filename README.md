# setup-egison

<p align="left">
  <a href="https://github.com/matsubara0507/setup-egison"><img alt="GitHub Actions status" src="https://github.com/matsubara0507/setup-egison/workflows/Main%20workflow/badge.svg"></a>
</p>

This action sets up a [Egison](https://www.egison.org) environment for use in actions by:

- optionally installing a version of egison and adding to PATH.
- Note that this action only support linux OS and [egison versions released by egison-package-builder](https://github.com/egison/egison-package-builder/releases).

## Usage

See [action.yml](action.yml)

Basic:

``` yaml
steps:
- uses: actions/checkout@master
- uses: actions/setup-egison@master
  with:
    egison-version: '3.10.3'
- run: egison --version
```

Matrix Testing:

``` yaml
jobs:
  run:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        egison: [ '3.10.3', '3.9.4' ]
    name: Egison ${{ matrix.egison }} sample
    steps:
      - uses: actions/checkout@master
      - name: Setup Egison
        uses: actions/setup-egison@master
        with:
          egison-version: ${{ matrix.egison }}
      - run: egison --version
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
