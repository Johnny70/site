# ============================================================
# MODULE: tests/test_storage
# RESPONSIBILITY: Tests for read_json and write_json in server/storage
# DEPENDS ON: pytest, server/storage
# EXPOSES: nothing
# ============================================================

import json
import pytest
from pathlib import Path
import server.storage as storage_module
from server.storage import read_json, write_json


def test_write_then_read_returns_same_data(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(storage_module, 'DATA_DIR', tmp_path)
    data = {'key': 'value', 'number': 42, 'list': [1, 2, 3]}

    write_json('test.json', data)
    result = read_json('test.json')

    assert result == data


def test_write_json_produces_valid_utf8_file(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(storage_module, 'DATA_DIR', tmp_path)
    data = {'greeting': 'Hej världen'}

    write_json('utf8.json', data)

    raw = (tmp_path / 'utf8.json').read_text(encoding='utf-8')
    parsed = json.loads(raw)
    assert parsed['greeting'] == 'Hej världen'


def test_write_json_creates_directory_if_missing(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    subdir = tmp_path / 'newdir'
    monkeypatch.setattr(storage_module, 'DATA_DIR', subdir)

    write_json('test.json', {'x': 1})

    assert (subdir / 'test.json').exists()


def test_read_json_raises_file_not_found(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(storage_module, 'DATA_DIR', tmp_path)

    with pytest.raises(FileNotFoundError):
        read_json('missing.json')


def test_write_json_overwrites_existing_file(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(storage_module, 'DATA_DIR', tmp_path)

    write_json('test.json', {'version': 1})
    write_json('test.json', {'version': 2})
    result = read_json('test.json')

    assert result['version'] == 2
