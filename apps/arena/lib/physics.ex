defmodule Physics do
  @moduledoc """
  Physics
  """
  use Rustler,
    otp_app: :arena,
    crate: :physics

  # When loading a NIF module, dummy clauses for all NIF function are required.
  # NIF dummies usually just error out when called when the NIF is not loaded, as that should never normally happen.
  def add(_arg1, _arg2), do: :erlang.nif_error(:nif_not_loaded)
  def check_collisions(_entity, _entities), do: :erlang.nif_error(:nif_not_loaded)
  def move_entities(_entities, _external_wall), do: :erlang.nif_error(:nif_not_loaded)
end
