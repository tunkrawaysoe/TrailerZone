export default function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user?.roles) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const hasRole = req.user.roles.some(role =>
            allowedRoles.includes(role)
        );

        if (!hasRole) {
            return res.status(403).json({
                message: "You are not authorized to access this resource"
            });
        }
        next();
    };
}