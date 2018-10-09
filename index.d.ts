import { EventEmitter } from "events";
import { Socket } from 'net';
import { LineStream } from 'byline';

type Object<V> = { [key: string]: V };

declare class EnumSymbol {
	constructor(name, options: { value: number, description: string });
	symbol: Symbol;
	value: number;
	description: string;
	display: string;
	toString(): string;
	valueOf(): number;
}

declare class Enum {
	constructor(constants: Object<{value: number, description: string}>);
	symbols(): EnumSymbol[];
	keys(): string[];
	contains(symbol: EnumSymbol): boolean;
	[key: string]: any;
}

declare module 'teamspeak' {
	/** Options for the ClientClass */
	interface ClientOptions {
		debug?: (message: string) => void
	}
	/** Data you can pass through the 'send'-command */
	type CommandData = Object<string[] | string> | string[] | string;
	/** String that will interpreted as boolean */
	type CommandBoolean = '0' | '1';
	/**
	 * @class Client
	 * @extends {EventEmitter}
	 */
	class Client extends EventEmitter {
		port: number;
		host: string;
		options: ClientOptions;
		socket: Socket;
		connected: Promise<void>;
		reader: LineStream;
		
		/**
		 * @constructor
		 * @param {string} host Host of the server
		 * @param {number} port Port of the server
		 * @param {ClientOptions} options Options for the Client
		 */
		constructor(host: string, port: number, options?: ClientOptions);
		/**
		 * Logs in the Client into the server
		 * @param {string} username Username of the ServerQuery
		 * @param {string} password Password of the ServerQuery
		 * @returns {Promise<any>} Promise of the result of the command includes errors
		 */
		authenticate(username: string, password: string): Promise<any>;

		send(command: 'help', help?: string);
		send(command: 'quit');
		send(command: 'login', data: { client_login_name: string; client_login_password: string });
		send(command: 'login', username: string, password: string);
		send(command: 'logout');
		send(command: 'version');
		send(command: 'hostinfo');
		send(command: 'instanceinfo');
		send(command: 'bindinglist');
		send(command: 'use', data: { sid?: string, port?: string });
		send(command: 'use', sid: string);
		send(command: 'use', data: [string, '-virtual']);
		send(command: 'serverlist', data?: ['-uid', '-short', '-all', '-onlyoffline']);
		send(command: 'serveridgetbyport', data: { virtualserver_port: string });
		send(command: 'serverdelete', data: { sid: string });
		send(command: 'servercreate', data: { virtualserver_name: string; [key: string]: string });
		send(command: 'serverstart', data: { sid: string }); 
		send(command: 'serverstop', data: { sid: string }); 
		send(command: 'serverprocessstop'); 
		send(command: 'serverinfo');
		send(command: 'serverrequestconnectioninfo');
		send(command: 'serveredit', data: { [key: string]: string });
		send(command: 'servergrouplist');
		send(command: 'servergroupadd', data: { name: string; type?: string });
		send(command: 'servergroupdel', data: { sgid: string; force?: CommandBoolean });
		send(command: 'servergroupcopy', data: { ssgid: string; tsgid: string; name: string; type: string });
		send(command: 'servergrouprename', data: { sgid: string; name: string; });
		send(command: 'servergrouppermlist', data: { sgid: string });
		send(command: 'servergrouppermlist', data: { sgid: string });
		send(command: 'servergroupaddperm', data: { sgid: string; permid?: string; permsid?: string; permvalue: string; permnegated: CommandBoolean; permskip: CommandBoolean }); 
		send(command: 'servergroupdelperm', data: { sgid: string; permid?: string; permsid?: string });
		send(command: 'servergroupaddclient', data: { sgid: string; cldbid: string });
		send(command: 'servergroupdelclient', data: { sgid: string; cldbid: string });
		send(command: 'servergroupclientlist', data: { sgid: string });
		send(command: 'servergroupsbyclientid', data: { cldbid: string });
		send(command: 'servergroupautoaddperm', data: { sgtype: string; permid?: string; permsid?: string; permvalue: string; permnegated: CommandBoolean; permskip: CommandBoolean });
		send(command: 'servergroupautodelperm', data: { sgtype: string; permid?: string; permsid?: string });

		/**
		 * Send a command to the server
		 * @param {string} command Command to send to the server
		 * @param data Arguments of the command
		 * @returns {Promise<any>} Promise of the result of the command includes errors
		 */
		send(command: string, data?: CommandData): Promise<any>;
		/**
		 * Registers a event-handler
		 * @param {string} event Name of the event 
		 * @param {Function} handler Handler to execute 
		 */
		on(event: string, handler: (res: any) => void);
		/**
		 * Parses results from the server
		 * @param {string} line Result
		 * @protected
		 */
		onData(line: string): void;
		/**
		 * Debugs with the debug function in options.debug
		 * @param {string} message Message to print
		 * @protected
		 */
		debug(message: string): void;
	}

	/** Mode of HostMessage */
	const HostMessageMode: Enum;
	/** TargetMode of a TextMessage */
	const TextMessageTargetMode: Enum;
	/** Logmode */
	const LogLevel: Enum;
	/** Reasonmode */
	const ReasonIdentifier: Enum;
	/** Types of a PermissionGroup */
	const PermissionGroupTypes: Enum;
	/** Types of a Token */
	const TokenType: Enum;
}
