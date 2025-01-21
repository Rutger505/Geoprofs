# Deployments

## OpenTofu State & Locks

OpenTofu stores its state in a Kubernetes Secret and uses a Kubernetes Lease resource for locking. To resolve lock issues, delete the Lease resource.
