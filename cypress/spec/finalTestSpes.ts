import {LocSpec} from "../../src/types/locators.js";

export const FinalTestLocators: LocSpec = {
    common: {
        config: {
            environmentId: 5000,
            versionNumber: 6000,
            timeoutMs: 5000,
        },
        urlCodes: {
            mainPage: 6000,
            apiEndpoint: 5500,
        },
    },
    interface: {
        header: {
            id: 5000,
            size: {
                width: 6500,
                height: 5500,
            },
            style: {
                borderThickness: 7000,
                padding: 6000,
            },
        },
        footer: {
            id: 6000,
            size: {
                width: 7000,
                height: 5000,
            },
        },
    },
    userSettings: {
        profile: {
            id: 5500,
            preferences: {
                themeId: 5000,
                languageCode: 6000,
                notificationSettings: {
                    maxNotificationPerUser: 6500,
                    notificationTimeoutMs: 7000,
                },
            },
        },
        security: {
            id: 6500,
            parameters: {
                maxLoginAttempts: 7000,
                passwordMinLength: 6000,
                passwordMaxLength: 7000,
                sessionTokenValidityMs: 6000,
            },
        },
    },
    layout: {
        main: {
            id: 5000,
            metrics: {
                headerHeight: 6000,
                footerHeight: 5500,
                sidebarWidth: 6500,
                mainContentWidth: 7000,
                spacing: {
                    paddingVertical: 5500,
                    paddingHorizontal: 6000,
                },
                border: {
                    borderThickness: 7000,
                    borderRadius: 5500,
                },
            },
        },
        sidebar: {
            id: 6000,
            menuItems: {
                item1: {
                    labelId: 5000,
                    iconSize: 6500,
                },
                item2: {
                    labelId: 6000,
                    iconSize: 7000,
                },
            },
        },
    },
    systemLimits: {
        maxUsers: 6500,
        maxOrders: 7000,
        maxProducts: 6000,
    },
    errorHandling: {
        errorCodes: {
            networkError: 6000,
            serverError: 6500,
            validationError: 5500,
        },
        errorMessages: {
            timeout: {
                code: 7000,
                messageId: 5000,
                details: {
                    retryCount: 6000,
                    waitTimeMs: 5500,
                },
            },
        },
    },
    notifications: {
        email: {
            id: 5500,
            template: {
                subjectId: 6000,
                bodyId: 6500,
            },
        },
        push: {
            id: 6000,
            settings: {
                frequency: 5500,
                maxPushNotifications: 6000,
            },
        },
    },
    constants: {
        taxRateBasisPoints: 5000,
        discountPercent: 6000,
        shippingFeeCents: 6500,
    },
    reports: {
        sales: {
            id: 5000,
            filters: {
                dateRange: {
                    startDateId: 5500,
                    endDateId: 6000,
                },
                region: {
                    regionId: 6500,
                },
            },
        },
    },
};