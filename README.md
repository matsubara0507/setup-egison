# setup-egison

<p align="left">
  <a href="https://github.com/matsubara0507/setup-egison"><img alt="GitHub Actions status" src="https://github.com/matsubara0507/setup-egison/workflows/Sample/badge.svg"></a>
</p>

This action sets up a [Egison](https://www.egison.org) environment for use in actions by:

- optionally installing a version of egison and adding to PATH.
- Note that this action only support linux OS.

## Usage

See [action.yml](action.yml)

Basic:

``` yaml
steps:
- uses: actions/checkout@master
- uses: matsubara0507/setup-egison@master
  with:
    egison-version: '4.1.2'
- run: egison --version
```

Matrix Testing:

``` yaml
jobs:
  run:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        egison: [ '4.1.2', '4.0.3', '3.10.3' ]
    name: Egison ${{ matrix.egison }} sample
    steps:
      - uses: actions/checkout@master
      - name: Setup Egison
        uses: matsubara0507/setup-egison@master
        with:
          egison-version: ${{ matrix.egison }}
      - run: egison --version
```

Supported versions:

- `4.1.2`
- `4.1.1`
- `4.1.0`
- `4.0.3`
- `4.0.0`
- `3.10.3`
- `3.9.4`

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
